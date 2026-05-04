import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  url: string;
  fallback?: React.ReactNode;
  className?: string;
}

export function LottieAnimation({ url, fallback, className }: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);
    setAnimationData(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setAnimationData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-indigo-50/50 rounded-xl ${className}`}>
        <div className="w-8 h-8 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-2" />
        <span className="text-xs text-muted-foreground font-medium">Animation loading</span>
      </div>
    );
  }

  if (error || !animationData) {
    return (
      <div className={`flex flex-col items-center justify-center bg-indigo-50/50 rounded-xl text-muted-foreground ${className}`}>
        {fallback || (
          <div className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-2">
              <div className="w-4 h-4 rounded-full bg-indigo-400" />
            </div>
            <span className="text-xs font-medium">Animation loading</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
