import { fireEvent, render, screen } from '@testing-library/react'
import AddChild from './AddChild'

const mockOnAddChildFun = jest.fn()

describe('Test onAddChild function when click on save button', () => {
  it('onAddChild should call when click on save button', () => {
    render(<AddChild onAddChild={mockOnAddChildFun} />)

    fireEvent.click(screen.getByText(/Add Child/i))
    const inputChildName = screen.getByTestId(/child-name/i)
    fireEvent.change(inputChildName, { target: { value: 'Tested Child' } })
    const choosePictureButton = screen.getByTestId('choose-picture')
    fireEvent.click(choosePictureButton)
    const picture = screen.getAllByRole('img')[0]
    fireEvent.click(picture)
    const saveButton = screen.getByTestId('save-button')
    fireEvent.click(saveButton)
    expect(mockOnAddChildFun).toHaveBeenCalled()
    expect(mockOnAddChildFun).toHaveBeenCalledWith(
      'Tested Child',
      picture.src,
      'Tested Child has been added!'
    )
  })
  it('onAddChild should not call if child name value is empty', () => {
    render(<AddChild onAddChild={mockOnAddChildFun} />)

    fireEvent.click(screen.getByText(/Add Child/i))
    const inputChildName = screen.getByTestId(/child-name/i)
    fireEvent.change(inputChildName, { target: { value: '' } })
    const choosePictureButton = screen.getByTestId('choose-picture')
    fireEvent.click(choosePictureButton)
    const picture = screen.getAllByRole('img')[0]
    fireEvent.click(picture)
    const saveButton = screen.getByTestId('save-button')
    fireEvent.click(saveButton)
    expect(mockOnAddChildFun).not.toHaveBeenCalled()
  })
  it('onAddChild should not call when click on save button without choose picture', () => {
    render(<AddChild onAddChild={mockOnAddChildFun} />)

    fireEvent.click(screen.getByText(/Add Child/i))
    const inputChildName = screen.getByTestId(/child-name/i)
    fireEvent.change(inputChildName, { target: { value: 'Tested Child' } })
    const choosePictureButton = screen.getByTestId('choose-picture')
    fireEvent.click(choosePictureButton)
    const saveButton = screen.getByTestId('save-button')
    fireEvent.click(saveButton)
    expect(mockOnAddChildFun).not.toHaveBeenCalled()
  })
})
