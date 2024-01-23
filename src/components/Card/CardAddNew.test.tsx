import { render, fireEvent, screen } from "@testing-library/react"
import { describe, expect, it, vi } from 'vitest';
import { CardAddNew } from "./CardAddNew";

describe('CardAddNew component unit tests', () => {
  it('fires onAddCard when not disabled and clicked', () => {
    const mockOnAddCard = vi.fn()
    render(<CardAddNew onAddCard={mockOnAddCard} disabled={false} />)

    const addButton = screen.getByRole('button')
    fireEvent.click(addButton)

    expect(mockOnAddCard).toHaveBeenCalled()
  })

  it('does not fire onAddCard when disabled and clicked', () => {
    const mockOnAddCard = vi.fn()
    render(<CardAddNew onAddCard={mockOnAddCard} disabled={true} />)

    const addButton = screen.getByRole('button')
    fireEvent.click(addButton)

    expect(mockOnAddCard).not.toHaveBeenCalled()
  })
})
