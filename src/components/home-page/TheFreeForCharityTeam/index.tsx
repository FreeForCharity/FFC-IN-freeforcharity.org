import React from 'react'
import TeamMemberCard from '@/components/ui/TeamMemberCard'
import { team } from '@/data/team'

const TheFreeForCharityTeam = () => {
  return (
    <section id="team" className="py-[50px]">
      <h2
        className="font-[400] text-[40px] lg:text-[48px] tracking-[0] text-center mx-auto mb-[50px]"
        id="faustina-font"
      >
        The Free For Charity Team
      </h2>

      <div className="w-[90%] mx-auto py-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch justify-center mb-[50px] gap-[30px]">
          {team.slice(0, 3).map((member) => (
            <TeamMemberCard
              key={member.name}
              imageUrl={member.imageUrl}
              name={member.name}
              title={member.title}
              linkedinUrl={member.linkedinUrl}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-[40px] gap-[30px]">
          {team.slice(3).map((member) => (
            <TeamMemberCard
              key={member.name}
              imageUrl={member.imageUrl}
              name={member.name}
              title={member.title}
              linkedinUrl={member.linkedinUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TheFreeForCharityTeam
