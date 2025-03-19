const LoadingDots = () => {
    return (
      <div className="flex gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounceDots [animation-delay:0s]"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounceDots [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounceDots [animation-delay:0.4s]"></span>
      </div>
    );
  };
  
  export default LoadingDots;
  