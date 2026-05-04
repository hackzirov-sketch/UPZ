import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  url: string;
  fallback?: React.ReactNode;
  className?: string;
}

export function LottieAnimation({ url, fallback, className }: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch lottie animation");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setAnimationData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
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
      <div className={`flex items-center justify-center bg-muted/20 animate-pulse rounded-lg ${className}`}>
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !animationData) {
    return (
      <div className={`flex items-center justify-center bg-muted/20 rounded-lg text-muted-foreground ${className}`}>
        {fallback || <div>Animation unavailable</div>}
      </div>
    );
  }

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
