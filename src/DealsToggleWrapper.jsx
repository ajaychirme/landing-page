import React, { useState } from "react";
import StudentDealsSection from "./StudentDealsSection";
import StudentDealsSection2 from "./StudentDealsSection2";
import StudentDealsSection3 from "./StudentDealsSection3";
import TotumWelcome from "./TotumWelcome";

const DealsToggleWrapper = ({ isLoggedIn }) => {
  const [showFirst, setShowFirst] = useState(true);

  const handleToggle = () => {
    setShowFirst((prev) => !prev);
  };

  return (
    <div onClick={handleToggle} className="cursor-pointer select-none">
      {/* <StudentDealsSection3/> */}

      <StudentDealsSection2 isLoggedIn={true}/>
            {/* {false ? (
<TotumWelcome/>
      ) : (
        <StudentDealsSection isLoggedIn={true} />
      )} */}
<hr />
    </div>
  );
};

export default DealsToggleWrapper;
