import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { ResultsTable } from './components/ResultsTable';
import { PaymentPrompt } from './components/PaymentPrompt';
import { searchByUsername } from './services/mockApiService';
import type { SearchResult } from './types';
import { AuthProvider, useAuth } from './AuthContext';
import { AuthForm } from './components/AuthForm';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};


const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedUsername, setSearchedUsername] = useState<string>('');

  const handleSearch = useCallback(async (username: string) => {
    if (!username.trim()) {
      setError('Username cannot be empty.');
      return;
    }
    setIsLoading(true);
    setResults(null);
    setIsPaid(false);
    setError(null);
    setSearchedUsername(username);

    try {
      const data = await searchByUsername(username);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePayment = useCallback(() => {
    // In a real application, this would trigger a payment flow with Stripe/PayPal.
    // Here, we just simulate a successful payment.
    setIsPaid(true);
  }, []);

  const handleNewSearch = () => {
    setResults(null);
    setIsPaid(false);
    setError(null);
    setSearchedUsername('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
        <Header />
        <main className="container mx-auto px-4 flex items-center justify-center" style={{minHeight: 'calc(100vh - 81px)'}}>
          <AuthForm />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          {!results && (
            <>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Find any user's comments.
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Enter a username to search for public comments across X, YouTube, Instagram, Reddit, and Facebook.
              </p>
              <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
              {error && <p className="text-red-400 mt-4">{error}</p>}
            </>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center mt-12">
              <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-brand-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-lg text-gray-300">Scraping the web for comments by "{searchedUsername}"...</p>
            </div>
          )}

          {results && !isLoading && (
            <div className="w-full mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-left">
                  Results for <span className="text-brand-teal">{searchedUsername}</span>
                </h2>
                <button
                  onClick={handleNewSearch}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  New Search
                </button>
              </div>

              {results.length > 0 ? (
                <>
                  <ResultsTable results={results} isPaid={isPaid} />
                  {!isPaid && <PaymentPrompt onPay={handlePayment} />}
                </>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 mt-6">
                  <h3 className="text-xl font-semibold text-white">No Comments Found</h3>
                  <p className="text-gray-400 mt-2">We couldn't find any public comments for the username "{searchedUsername}".</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
