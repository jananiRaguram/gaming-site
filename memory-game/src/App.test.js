import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate directly from react-router-dom
import PasswordProtectedPage from './pages/transfer';

// Mocking useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mocking useNavigate as a Jest mock function
}));


test('clicking the Contact Us link to test it goes to the correct page', () => {
  render(<App />);

  const link = screen.getByText(/Contact Us/i);

  fireEvent.click(link);

  expect(window.location.href).toContain('/contact');
});

test('clicking the Log In link to test it goes to the correct page', () => {
  render(<App />);

  const link = screen.getByText(/Log In/i);

  fireEvent.click(link);

  expect(window.location.href).toContain('/login');
});

test('clicking the About Us dropdown and then a link navigates to the correct page', () => {
  render( <App /> );

  const dropdownToggle = screen.getByText(/About Us/i);
  fireEvent.click(dropdownToggle);

  const phaserLink = screen.getByText(/Mohammad/i);
  fireEvent.click(phaserLink);

  expect(window.location.href).toContain('/mohammad');
});

test('Viewing memory game instructions', () => {
  render( <App /> );

  const dropdownToggle = screen.getByText(/Games/i);
  fireEvent.click(dropdownToggle);

  const link = screen.getByText(/Memory Match Up/i);
  fireEvent.click(link);

  const instructions = screen.getByText(/instructions/i);
  fireEvent.click(instructions);

});

test('Viewing buzz words game instructions', () => {
  render( <App /> );

  const dropdownToggle = screen.getByText(/Games/i);
  fireEvent.click(dropdownToggle);

  const link = screen.getByText(/Buzz Words/i);
  fireEvent.click(link);

  const instructions = screen.getByText(/instructions/i);
  fireEvent.click(instructions);

});

test('Viewing word search game instructions', () => {
  render( <App /> );

  const dropdownToggle = screen.getByText(/Games/i);
  fireEvent.click(dropdownToggle);

  const link = screen.getByText(/Word Search/i);
  fireEvent.click(link);

  const instructions = screen.getByText(/instructions/i);
  fireEvent.click(instructions);

});

test('Testing form fields in signup', () => {
  render( <App /> );
  const link = screen.getByText(/Sign Up/i);
  fireEvent.click(link);

  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const emailInput = screen.getByPlaceholderText(/name@example.com/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);

  // Simulate user input by firing input events on the input fields
  fireEvent.input(usernameInput, { target: { value: 'sampleUsername' } });
  fireEvent.input(emailInput, { target: { value: 'sample@email.com' } });
  fireEvent.input(passwordInput, { target: { value: 'samplePassword' } });

  const signUpButton = screen.getByRole('button', { name: /Sign up/i });
  fireEvent.click(signUpButton);
})

test('Testing form fields in contact us', () => {
  render( <App /> );
  const link = screen.getByText(/Contact Us/i);
  fireEvent.click(link);

  const usernameInput = screen.getByPlaceholderText(/Name/i);
  const emailInput = screen.getByPlaceholderText(/name@example.com/i);
  const subjectInput = screen.getByLabelText(/Subject/i);
  const messageInput = screen.getByLabelText(/Message/i);

  // Simulate user input by firing input events on the input fields
  fireEvent.input(usernameInput, { target: { value: 'sampleUsername' } });
  fireEvent.input(emailInput, { target: { value: 'sample@email.com' } });
  fireEvent.input(subjectInput, { target: { value: 'samplePassword' } });
  fireEvent.input(messageInput, { target: { value: 'test message!' } });

  const submitButton = screen.getByRole('button', { name: /Submit/i });
  fireEvent.click(submitButton);
})


test('input invalid password and submit form', () => {
  render(<PasswordProtectedPage />);

  // Find the input field by its placeholder text
  const passwordInput = screen.getByPlaceholderText(/Key/i);

  // Simulate user typing "yes" into the input field
  fireEvent.change(passwordInput, { target: { value: 'yes' } });

  const submitButton = screen.getByRole('button', { name: /Get Access/i });

  expect(passwordInput.value).toBe('yes');

  fireEvent.click(submitButton);

  // It should get cleared after submitting
  expect(passwordInput.value).toBe('');
});


test('correct password removes the protection form', async () => {
  render(<PasswordProtectedPage />);

  const passwordInput = screen.getByPlaceholderText(/Key/i);
  
  fireEvent.change(passwordInput, { target: { value: 'p8mU45McP' } });

  const submitButton = screen.getByRole('button', { name: /Get Access/i });

  fireEvent.click(submitButton);

  // Wait for the form to be removed from the DOM
  await waitFor(() => {
    expect(screen.queryByPlaceholderText(/Key/i)).toBeNull();
  });

});


test('clicking the Leaderboard dropdown and viewing the buzz words table', async () => {
  render(<App />);

  // Find the Leaderboard link by its text content
  const leaderboardLink = screen.getByText(/Leaderboard/i, { selector: 'a' });
  
  fireEvent.click(leaderboardLink);

  // Find the dropdown select element
  const selectElement = screen.getByRole('combobox');

  fireEvent.change(selectElement, { target: { value: 'buzzwords' } });

  // Wait for the buzz words table to be available
  const buzzWordsTable = await screen.findByText(/Anagram/i);

  expect(buzzWordsTable).toBeInTheDocument();
});

test('clicking the Leaderboard dropdown and viewing the memory match up table', async () => {
  render(<App />);

  const leaderboardLink = screen.getByText(/Leaderboard/i, { selector: 'a' });
  fireEvent.click(leaderboardLink);

  const memoryGameOption = await screen.findByText(/Memory Match Up/i);
  fireEvent.click(memoryGameOption);

  const memoryGameTable = await screen.findByText(/Theme/i);

  expect(memoryGameTable).toBeInTheDocument();
});
