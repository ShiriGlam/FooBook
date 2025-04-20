import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomePageApp from './HomePage/HomePageApp';
describe('HomePageApp Tests', () => {
    test('Renders HomePageApp', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <Routes> { }
                    <Route path="/home" element={<HomePageApp />} /> {}
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Welcome, !')).toBeInTheDocument();
    });
    test('Adds new post and displays it', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <Routes>{ }
                    <Route path="/home" element={<HomePageApp />} /> {}
                </Routes>
            </MemoryRouter>
        );
        //adding a new post
        fireEvent.change(screen.getByPlaceholderText("What's on your mind?"), {
            target: { value: 'New post content' },
        });
        fireEvent.click(screen.getByText('Share'));

        // assert that the new post is displayed
        expect(screen.getByText('New post content')).toBeInTheDocument();

    });


});
