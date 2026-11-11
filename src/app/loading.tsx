const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-red-200" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-r-red-600 animate-spin" />
        </div>

        {/* Text */}
        <h2 className="text-2xl md:text-3xl font-semibold text-red-900 mb-2">
          Loading...
        </h2>

        <p className="text-red-700/80 mb-6 max-w-md">
          Please wait while we prepare everything for you.
        </p>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-3 h-3 bg-red-600 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;