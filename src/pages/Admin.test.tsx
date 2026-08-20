import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import Admin from './Admin'
import { DEFAULT_BASE_COST } from '../lib/pricing'
import { getBaseCost, setBaseCost } from '../lib/storage'

const FIELD = 'Base cost per cubic metre'

beforeEach(() => {
  localStorage.clear()
})

describe('Admin', () => {
  it('pre-fills the default base cost when nothing is stored', () => {
    render(<Admin />)

    expect(screen.getByLabelText(FIELD)).toHaveValue(DEFAULT_BASE_COST)
  })

  it('pre-fills the stored base cost', () => {
    setBaseCost(37.5)
    render(<Admin />)

    expect(screen.getByLabelText(FIELD)).toHaveValue(37.5)
  })

  it('saves a new base cost and confirms it', async () => {
    const user = userEvent.setup()
    render(<Admin />)

    await user.clear(screen.getByLabelText(FIELD))
    await user.type(screen.getByLabelText(FIELD), '45')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(getBaseCost()).toBe(45)
    expect(screen.getByRole('status')).toHaveTextContent(
      'Base cost saved as £45.00 per cubic metre.',
    )
  })

  it.each(['0', '-10', 'abc', ''])('rejects %j', async (input) => {
    const user = userEvent.setup()
    setBaseCost(20)
    render(<Admin />)

    await user.clear(screen.getByLabelText(FIELD))
    if (input) await user.type(screen.getByLabelText(FIELD), input)
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(
      screen.getByText('Base cost must be a number greater than zero'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(getBaseCost()).toBe(20)
  })

  it('hides the confirmation once the value is edited again', async () => {
    const user = userEvent.setup()
    render(<Admin />)

    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByRole('status')).toBeInTheDocument()

    await user.type(screen.getByLabelText(FIELD), '9')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
