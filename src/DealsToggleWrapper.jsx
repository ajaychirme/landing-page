import React, { useState } from "react";
import StudentDealsSection from "./StudentDealsSection";
import StudentDealsSection1 from "./StudentDealsSection1";
import TotumWelcome from "./TotumWelcome";

const DealsToggleWrapper = ({ isLoggedIn }) => {
  const [showFirst, setShowFirst] = useState(true);

  const handleToggle = () => {
    setShowFirst((prev) => !prev);
  };

  return (
    <div onClick={handleToggle} className="cursor-pointer select-none">
      {showFirst ? (
<TotumWelcome/>
      ) : (
        <StudentDealsSection1 isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
};

export default DealsToggleWrapper;
