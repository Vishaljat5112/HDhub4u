const MovieFooter = ({ title }) => {
  return (
    <div className="mt-20 text-[#ddd] text-[15px]">

      {/* TOP SEO TITLE */}
      <h3 className="text-center mb-3 font-medium">
        Download {title} Hindi HDTC 720p & 480p HD | Watch Online on HDHub4u :
      </h3>

      {/* DESCRIPTION */}
      <p className="text-[#bdbdbd] leading-[1.9] text-center">
        <b>DESCRIPTION :-</b> {title} (2026) Hindi 720p HDTC x264 1GB Watch Online
        [G-Drive] 9xmovies, world4ufree, Khatrimaza, 123Movies, fmovies, Gomovies,
        gostream 300Mb Dual Audio Hindi Dubbed | {title} 720p WEBRip x264 AC3 ESub
        Hindi (LiNE) Download Google Drive links Free on HDHub4u | Latest Movies &
        Series Free Download & Watch Online | AMAZON PRIME | NETFLIX Free Download.
      </p>

      <hr className="border-t border-[#333] my-9" />

      {/* STORYLINE */}
      <h3 className="text-center mb-4 font-medium">
        Download {title} (2026) Hindi HDTC Full Movie –{" "}
        <span className="text-red-500">Storyline :</span>
      </h3>

      <p className="leading-[1.9] text-center text-[#cfcfcf] italic">
        {title} (2026) Hindi 720p Full Movie: A gripping courtroom drama centers
        on unexplained sexual assault cases. An investigator and defense team
        fight to reveal shocking truths hidden beneath statistics and uncover
        the human cost behind the headlines.
      </p>

      {/* REVIEW */}
      <h3 className="text-center mt-10 mb-4 font-medium">
        Download {title} (2026) HDTC Full Movie in Hindi –{" "}
        <span className="text-red-500">Review :</span>
      </h3>

      <p className="leading-[1.9] text-center text-[#cfcfcf] italic">
        Taapsee Pannu as Ravee delivers another stupendous performance here.
        One look at Ravee and you know the kind of baggage that she has been
        carrying – a silent burden of frustration and resentment, reflecting
        in her conversations with Kartik too. And yet, there is hope in the
        form of a silver lining to her demeanor, still willing to fight it out
        despite all odds stacked up against her. Notice how Taapsee switches
        gears to be softer with her interactions with Parima, but unhinged in
        courtroom scenes in her bid for justice. She was an absolute treat to
        witness here.
      </p>

      <hr className="border-t border-[#333] my-10" />

      {/* REACTIONS */}
      <h2 className="text-center text-xl font-semibold mb-2">
        Did you Like it?
      </h2>

      <div className="text-center text-[#3ea6ff] mb-6">
        71 Reactions
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        {[
          { label: "🔥 Excellent", count: 38 },
          { label: "😍 Loved", count: 9 },
          { label: "😊 Thanks", count: 12 },
          { label: "🤩 Wow", count: 3 },
          { label: "😔 Sad", count: 9 },
        ].map((r, i) => (
          <div
            key={i}
            className="
              bg-[#2a2a2a]
              px-4 py-2
              rounded-md
              text-center
              min-w-22.5
            "
          >
            <div className="font-semibold">{r.label}</div>
            <div className="text-[#3ea6ff] mt-1">{r.count}</div>
          </div>
        ))}
      </div>

      {/* COMMENT BOX */}
      <div className="mt-10">
        <input
          type="text"
          placeholder="Join the discussion"
          className="
            w-full
            px-4 py-3
            rounded-md
            bg-[#111]
            border border-[#333]
            text-white
            text-[15px]
            focus:outline-none
            focus:border-yellow-500
          "
        />
      </div>

      {/* COPYRIGHT */}
      <div className="mt-10 pt-5 border-t border-[#333] text-center text-[#777] text-sm">
        © {new Date().getFullYear()} HDHub4u • All Rights Reserved
      </div>
    </div>
  );
};

export default MovieFooter;