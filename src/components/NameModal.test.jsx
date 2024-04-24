import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NameModal from './NameModal.jsx';

describe('NameModal Component', () => {
  it('should display an error when trying to submit an empty name', async () => {
    const mockSubmit = vi.fn();
    render(<NameModal isVisible={true} onSubmit={mockSubmit} defaultName="" />);

    await userEvent.click(screen.getByRole('button', { name: /join the campfire/i }));
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with sanitized name when a valid name is entered', async () => {
    const mockSubmit = vi.fn();
    render(<NameModal isVisible={true} onSubmit={mockSubmit} defaultName="" />);

    await userEvent.type(screen.getByRole('textbox'), 'John Doe');
    await userEvent.click(screen.getByRole('button', { name: /join the campfire/i }));

    expect(mockSubmit).toHaveBeenCalledWith('John Doe');
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
  });

  it('should reject names with invalid characters', async () => {
    const mockSubmit = vi.fn();
    render(<NameModal isVisible={true} onSubmit={mockSubmit} defaultName="" />);

    await userEvent.type(screen.getByRole('textbox'), '<script>alert("hack")</script>');
    await userEvent.click(screen.getByRole('button', { name: /join the campfire/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/please enter a valid username without special characters/i)).toBeInTheDocument();
  });
});
