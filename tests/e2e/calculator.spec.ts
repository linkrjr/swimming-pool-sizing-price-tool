import { expect, test } from '@playwright/test'

async function setBaseCost(page: import('@playwright/test').Page, value: string) {
  await page.goto('/admin')
  await page.getByLabel('Base cost per cubic metre').fill(value)
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByRole('status')).toBeVisible()
}

async function quote(
  page: import('@playwright/test').Page,
  length: string,
  width: string,
  depth: string,
) {
  await page.getByLabel('Length').fill(length)
  await page.getByLabel('Width').fill(width)
  await page.getByLabel('Depth').fill(depth)
  await page.getByRole('button', { name: 'Calculate' }).click()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
})

test('prices a pool using the base cost set in admin', async ({ page }) => {
  await setBaseCost(page, '30')

  await page.getByRole('link', { name: 'Calculator' }).click()
  await expect(page).toHaveURL('/')

  await quote(page, '10', '5', '2')

  await expect(page.getByText('$3,000.00')).toBeVisible()
  await expect(page.getByText('Based on a volume of 100 m3')).toBeVisible()
})

test('shows no result before calculating', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByText('Your estimate will appear here once you calculate.'),
  ).toBeVisible()
})

test('shows an error for every empty field and no result', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Calculate' }).click()

  await expect(page.getByRole('alert')).toHaveCount(3)
  await expect(page.getByText('Estimated cost')).toHaveCount(0)
})

test('rejects a negative dimension', async ({ page }) => {
  await page.goto('/')
  await quote(page, '10', '-5', '2')

  await expect(
    page.getByText('Width must be a number greater than zero'),
  ).toBeVisible()
  await expect(page.getByText('Estimated cost')).toHaveCount(0)
})

test('recalculates against an updated base cost', async ({ page }) => {
  await setBaseCost(page, '10')
  await page.goto('/')
  await quote(page, '2', '2', '2')
  await expect(page.getByText('$80.00')).toBeVisible()

  await setBaseCost(page, '20')
  await page.goto('/')
  await quote(page, '2', '2', '2')
  await expect(page.getByText('$160.00')).toBeVisible()
})

test('the admin link is reachable from the calculator', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Admin' }).click()

  await expect(page).toHaveURL('/admin')
  await expect(
    page.getByRole('heading', { name: 'Admin' }),
  ).toBeVisible()
})
