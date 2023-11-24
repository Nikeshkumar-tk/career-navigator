'use client'

import { useEffect, useState } from "react";

export default function hydratedComponent(Component: React.FC) {
  return function HydratedComponent() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);
    if (!hydrated) return;

    return <Component />
  };
}
