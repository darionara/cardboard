import { render, fireEvent, screen } from "@testing-library/react"
import { describe, expect, it, vi } from 'vitest';
import { CardModelData } from "../../data"
import { createCard } from "../../data/card/factory"
import { Card } from "./Card"

describe('Card component unit tests', () => {
  const cardMock: CardModelData = createCard({
    content: 'Test content'
  })

  it('enters edit mode on click', () => {
    render(<Card {...cardMock} />)

    const card = screen.getByText('Test content')
    fireEvent.click(card)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
  })

  it('exits edit mode on click outside', () => {
    render(<Card {...cardMock} />)
    fireEvent.click(screen.getByText('Test content'))

    fireEvent.blur(screen.getByRole('textbox'))

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('fires onUpdateCard when exiting edit mode', () => {
    const mockUpdateCard = vi.fn()
    render(<Card {...cardMock} onUpdateCard={mockUpdateCard} />)

    fireEvent.click(screen.getByText('Test content'))

    fireEvent.blur(screen.getByRole('textbox'))

    expect(mockUpdateCard).toHaveBeenCalled()
  })

  it('sets textarea value on change in edit mode', () => {
    render(<Card {...cardMock} />)

    fireEvent.click(screen.getByText('Test content'))

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New content' } })

    expect(textarea.value).toBe('New content')
  })
})
