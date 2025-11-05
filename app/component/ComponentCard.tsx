export default function GithubRepos({ repo }: { repo: any }) {
  return (
    <div
      className="repos bg-linear-to-r from-[#11182b] to-[#1d1c48] rounded-[12px] flex
      flex-col justify-between p-[4%] box-border min-h-[200px] text-[white] w-[94%] mb-[8%]"
    >
      {/* Repo Name */}
      <div className="firstline text-[24px] font-bold">
        {repo.name || "No name"}
      </div>

      {/* Repo Description */}
      <div className="secondline text-[#555d72] text-[17.5px]">
        {repo.description || "No description available"}
      </div>

      {/* Stats: forks, stars, updated */}
      <div className="thirdline text-[16px] flex gap-[7%] flex-wrap items-center text-[#555d72]">
        <span className="numberofforks flex gap-[8%]">
          <img className="w-[30%]" src="Nesting.svg" alt="Forks" />
          {repo.forks_count || 0}
        </span>
        <span className="numberofstars flex gap-[8%]">
          <img src="Star.svg" alt="Stars" className="spanimage w-[30%]" />
          {repo.stargazers_count || 0}
        </span>
        <span className="updated">
          updated {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
