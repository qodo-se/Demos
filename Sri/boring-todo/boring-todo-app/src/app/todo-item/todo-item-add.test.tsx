import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// A simple component to test
const HelloWorld = () => {
    return <h1>Hello, World!</h1>;
};

describe('Hello World Tests', () => {
    // Test for the utility function
    it('should return hello world message', () => {
        expect("Hello, World!").toBe('Hello, World!');
    });

    // Test for the React component
    it('should render hello world heading', () => {
        render(<HelloWorld />);
        const heading = screen.getByRole('heading', { name: /hello, world!/i });
        expect(heading).toBeInTheDocument();
    });
});
