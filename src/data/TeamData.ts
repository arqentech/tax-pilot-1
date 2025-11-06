export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Luca Ferraro",
    role: "Chief Tax Consultant",
    image: "/png/member1.png",
  },
  {
    name: "Elena Marino",
    role: "Senior Tax Advisor",
    image: "/png/member2.png",
  },
  {
    name: "Mateo Ortiz",
    role: "Compliance Specialist",
    image: "/png/member3.png",
  },
  {
    name: "Sofia Ricci",
    role: "Client Success Lead",
    image: "/png/member4.png",
  },
];
