"use client";

import ProfileComponent from "./component/ProfileInfo";
import ComponentCard from "./component/ComponentCard";
import { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [repoData, setRepoData] = useState<any[]>([]);
  const [showAllRepos, setShowAllRepos] = useState(false);

  // Update state as user types
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Fetch user data when Enter is pressed
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && username.trim() !== "") {
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data) => {
          setUserData(data);
          setShowAllRepos(false); // reset view-all when searching new user
        })
        .catch((err) => {
          console.error(err.message);
          setUserData(null);
          setRepoData([]);
        });
    }
  };

  // Fetch repos whenever userData updates
  useEffect(() => {
    if (!userData) return;

    fetch(`https://api.github.com/users/${userData.login}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepoData(data);
      })
      .catch((err) => console.error(err));
  }, [userData]);

  // Determine which repos to display
  const displayedRepos = showAllRepos ? repoData : repoData.slice(0, 5);

  return (
    <div className="main-container h-[100%]">
      {/* Top Section */}
      <div
        className="top-section bg-[url(../public/hero-image-github-profile-sm.jpg)] aspect-video bg-cover
       bg-center h-[22%] w-[100%] flex justify-center"
      >
        <div
          className="search bg-[#20293a] w-[80%] h-[30%] mt-[5%] rounded-[12px]
         flex items-center gap-[3%] p-[3%]  md:w-[50%] "
        >
          <img className="w-[40px] h-[30px]" src="/Search.svg" alt="Search" />
          <input
            value={username}
            type="text"
            onChange={handleUserInput}
            onKeyDown={handleKeyPress}
            placeholder="username"
            className="placeholder-[#cdd5e0] bg-transparent text-white"
          />
        </div>
      </div>

      {/* Middle Section */}
      {userData && (
        <div className="profile-info h-[50%] md flex flex-col gap-[4%] ml-[6%] mb-[6%] md:flex-row md:h-[10%] md:items-center ">
          <div className="github-image w-[30%] md:w-[10%]">
            <img
              className="w-[100%]"
              src="/Github-logo.jpg"
              alt="GitHub logo"
            />
          </div>
          <div className="separate flex flex-col h-[55%] justify-between w-[80%] md:flex-row md:w-[75%] md:items-center">
            <ProfileComponent
              name="Followers"
              otherInfo={userData.followers ?? "—"}
            />
            <ProfileComponent
              name="Following"
              otherInfo={userData.following ?? "—"}
            />
            <ProfileComponent
              name="Location"
              otherInfo={userData.location ?? "N/A"}
            />
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className="bottom-section ml-[6%] flex flex-col ">
        <h1 className="text-4xl text-[#cdd5e0] mb-[3%]">GitHub</h1>
        <div className="project-intro text-[#cdd5e0] text-[19px] mb-[6%]">
          How people build software
        </div>

        <div className="components flex flex-col md:grid md:grid-cols-2 md:w-[94%] ">
          {repoData.length > 0 ? (
            <>
              {displayedRepos.map((repo) => (
                <a href={repo.html_url} key={repo.id} target="_blank">
                  <ComponentCard repo={repo} />
                </a>
              ))}

              
            </>
          ) : userData ? (
            <p className="text-[#cdd5e0]">No repositories found</p>
          ) : null}

          
        </div>
        {!showAllRepos && repoData.length > 5 && (
                <button
                  className="mt-4 px-4 py-2  text-white rounded ml-auto mx-auto "
                  onClick={() => setShowAllRepos(true)}
                >
                  View all repositories
                </button>
              )}
      </div>
    </div>
  );
}
