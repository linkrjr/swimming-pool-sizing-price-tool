import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/admin')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('shows the default base cost', async ({ page }) => {
  await expect(page.getByLabel('Base cost per cubic metre')).toHaveValue('25')
})

test('saves a new base cost and confirms it', async ({ page }) => {
  await page.getByLabel('Base cost per cubic metre').fill('30')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page.getByRole('status')).toHaveText(
    'Base cost saved as £30.00 per cubic metre.',
  )
})

test('the saved base cost survives a reload', async ({ page }) => {
  await page.getByLabel('Base cost per cubic metre').fill('62.5')
  await page.getByRole('button', { name: 'Save' }).click()

  await page.reload()

  await expect(page.getByLabel('Base cost per cubic metre')).toHaveValue('62.5')
})

test('rejects a non-positive base cost and keeps the stored value', async ({
  page,
}) => {
  await page.getByLabel('Base cost per cubic metre').fill('40')
  await page.getByRole('button', { name: 'Save' }).click()

  await page.getByLabel('Base cost per cubic metre').fill('-1')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(
    page.getByText('Base cost must be a number greater than zero'),
  ).toBeVisible()
  await expect(page.getByRole('status')).toHaveCount(0)

  await page.reload()
  await expect(page.getByLabel('Base cost per cubic metre')).toHaveValue('40')
})
