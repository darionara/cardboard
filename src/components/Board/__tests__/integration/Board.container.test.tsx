import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import BoardContainer from '../../Board.container'
import { describe, expect, it, vi } from 'vitest'
import * as dataModule from '../../../../data'

describe('BoardContainer integration tests', () => {
  // MSW version
  it('adds a new card when <CardAddNew /> is clicked', async () => {
    // Render the BoardContainer
    render(<BoardContainer />)

    // Simulate click on <CardAddNew />
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Add new card' }))

      // Check if a new card is displayed
      expect(screen.getByText('Click to start noting')).toBeInTheDocument()
    })
  })

  // Mock version
  it('adds a new card when <CardAddNew /> is clicked', async () => {
    // Mock the findCards function and POST request in CardModel
    vi.spyOn(dataModule, 'findCards').mockResolvedValue([])
    const createCardSpy = vi.
      spyOn(dataModule.CardModel.prototype, 'create')
      .mockResolvedValue()

    // Render the BoardContainer
    render(<BoardContainer />)

    // Simulate click on <CardAddNew />
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', {name: 'Add new card' }))

      // Check if a new card is displayed
      expect(screen.getByText('Click to start noting')).toBeInTheDocument()
    })

    expect(createCardSpy).toHaveBeenCalledTimes(1)

    createCardSpy.mockRestore()
  })
})
