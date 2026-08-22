import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import Calculator from './Calculator'
import { setBaseCost } from '../lib/storage'

async function fillAndCalculate(length: string, width: string, depth: string) {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Length'), length)
  await user.type(screen.getByLabelText('Width'), width)
  await user.type(screen.getByLabelText('Depth'), depth)
  await user.click(screen.getByRole('button', { name: 'Calculate' }))
}

beforeEach(() => {
  localStorage.clear()
})

describe('Calculator', () => {
  it('renders the three dimension fields, the button and no result yet', () => {
    render(<Calculator />)

    expect(screen.getByLabelText('Length')).toBeInTheDocument()
    expect(screen.getByLabelText('Width')).toBeInTheDocument()
    expect(screen.getByLabelText('Depth')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument()
    expect(screen.queryByText(/Estimated cost/)).not.toBeInTheDocument()
  })

  it('prices the pool using the stored base cost', async () => {
    setBaseCost(30)
    render(<Calculator />)

    await fillAndCalculate('10', '5', '2')

    expect(screen.getByText('$3,300.00')).toBeInTheDocument()
    expect(screen.getByText('Based on a volume of 100 m3')).toBeInTheDocument()
  })

  it('uses the updated base cost without a remount', async () => {
    setBaseCost(10)
    render(<Calculator />)

    await fillAndCalculate('2', '2', '2')
    expect(screen.getByText('$88.00')).toBeInTheDocument()

    setBaseCost(20)
    await userEvent.click(screen.getByRole('button', { name: 'Calculate' }))
    expect(screen.getByText('$176.00')).toBeInTheDocument()
  })

  it('shows an error for each empty field and no result', async () => {
    render(<Calculator />)

    await userEvent.click(screen.getByRole('button', { name: 'Calculate' }))

    expect(screen.getAllByRole('alert')).toHaveLength(3)
    expect(screen.queryByText(/Estimated cost/)).not.toBeInTheDocument()
  })

  it('rejects a negative dimension', async () => {
    render(<Calculator />)

    await fillAndCalculate('10', '-5', '2')

    expect(
      screen.getByText('Width must be a number greater than zero'),
    ).toBeInTheDocument()
    expect(screen.queryByText(/Estimated cost/)).not.toBeInTheDocument()
  })

  it('rejects a zero dimension', async () => {
    render(<Calculator />)

    await fillAndCalculate('10', '5', '0')

    expect(
      screen.getByText('Depth must be a number greater than zero'),
    ).toBeInTheDocument()
    expect(screen.queryByText(/Estimated cost/)).not.toBeInTheDocument()
  })

  it('clears a previous result when input becomes invalid', async () => {
    setBaseCost(25)
    render(<Calculator />)

    await fillAndCalculate('2', '2', '2')
    expect(screen.getByText('$220.00')).toBeInTheDocument()

    await userEvent.clear(screen.getByLabelText('Depth'))
    await userEvent.click(screen.getByRole('button', { name: 'Calculate' }))

    expect(screen.queryByText('$220.00')).not.toBeInTheDocument()
    expect(
      screen.getByText('Depth must be a number greater than zero'),
    ).toBeInTheDocument()
  })

  it('falls back to the default base cost when nothing is stored', async () => {
    render(<Calculator />)

    await fillAndCalculate('2', '2', '1')

    expect(screen.getByText('$110.00')).toBeInTheDocument()
  })
})
