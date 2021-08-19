import React, { useState, useEffect } from "react";
import partnerProfile from "../../services/partner-profile";

function PartnerProfile() {
  const [name, setName] = useState({});
  // common interests = need user id (see in backend) + partner id, get their skills and add nto new array when a skill is in both. match.
  // other interests = partner skills not in previous array
  // list of all skills first
  // language = join table questy to users-language
  // common partners = NO. don't have common partners because we're not doing conenctions

  useEffect(() => {
    async function displayName() {
      const name = await partnerProfile.getPartnerDetails(25);
      setName(name);
    }
    displayName();
  }, []);

  if (name) {
    console.log(name);

    return (
      <div>
        <h1>{name.data.name}</h1>
        <p>{!name.data.goal ? "No goal set yet" : name.data.goal}</p>
      </div>
    );
  }
  return "Loading...";
  /* return
  message button,
  onClick, display email form
  */
}

export default PartnerProfile;
