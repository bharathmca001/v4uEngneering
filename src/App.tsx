import React, { useState, useEffect } from 'react';
import { OriginalDesign } from './designs/OriginalDesign';
import { Design2 } from './designs/Design2';
import { Design3 } from './designs/Design3';
import { DesignVariant } from './components/DesignSelector';

function App() {
  const [currentDesign, setCurrentDesign] = useState<DesignVariant>(() => {
    const saved = localStorage.getItem('v4u-design');
    return (saved as DesignVariant) || 'design1';
  });

  useEffect(() => {
    localStorage.setItem('v4u-design', currentDesign);
  }, [currentDesign]);

  const handleDesignChange = (design: DesignVariant) => {
    setCurrentDesign(design);
  };

  switch (currentDesign) {
    case 'design2':
      return <Design2 onDesignChange={handleDesignChange} />;
    case 'design3':
      return <Design3 onDesignChange={handleDesignChange} />;
    default:
      return <OriginalDesign onDesignChange={handleDesignChange} />;
  }
}

export default App;
