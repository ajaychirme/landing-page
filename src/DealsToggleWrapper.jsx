import React, { useState } from "react";
import StudentDealsSection from "./StudentDealsSection";
import StudentDealsSection2 from "./StudentDealsSection2";
import TotumWelcome from "./TotumWelcome";

const DealsToggleWrapper = ({ isLoggedIn }) => {
  const [showFirst, setShowFirst] = useState(true);

  const handleToggle = () => {
    setShowFirst((prev) => !prev);
  };

  return (
    <div onClick={handleToggle} className="cursor-pointer select-none">
      {false ? (
<TotumWelcome/>
      ) : (
        <StudentDealsSection isLoggedIn={true} />
      )}
<hr />
      <StudentDealsSection2 isLoggedIn={true}/>
    </div>
  );
};

export default DealsToggleWrapper;
