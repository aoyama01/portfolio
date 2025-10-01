interface StatsProps {
  projectCount: number;
  contributionCount?: number;
  yearsOfExperience?: number;
}

export function Stats({ projectCount, contributionCount, yearsOfExperience }: StatsProps) {
  const stats = [
    {
      label: "Projects",
      value: projectCount,
      show: true,
    },
    {
      label: "Contributions",
      value: contributionCount,
      show: contributionCount !== undefined,
    },
    {
      label: "Years Experience",
      value: yearsOfExperience,
      show: yearsOfExperience !== undefined,
    },
  ];

  const visibleStats = stats.filter((stat) => stat.show);

  if (visibleStats.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
      {visibleStats.map((stat) => (
        <div key={stat.label}>
          <div className="text-3xl font-bold sm:text-4xl">{stat.value}</div>
          <div className="text-foreground/60 mt-1 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
