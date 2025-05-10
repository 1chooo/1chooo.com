import CompanyCard from "@/components/resume/company-card"

export default function Page() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Company Experience</h1>
      <div className="grid gap-6">
        <CompanyCard
          companyImage="/favicon.ico?height=40&width=40"
          companyName="Acme Corporation"
          title="Senior Developer"
          position="Full-time"
          date="Jan 2022 - Present"
          description={[
            "Led the development of the company's flagship product using React and Next.js",
            "Implemented CI/CD pipelines and improved deployment processes",
            "Mentored junior developers and conducted code reviews",
          ]}
        />

        <CompanyCard
          companyImage="/favicon.ico?height=40&width=40"
          companyName="Tech Innovations"
          title="Frontend Engineer"
          position="Contract"
          date="Mar 2020 - Dec 2021"
          description={[
            "Designed and developed responsive user interfaces for various client projects",
            "Worked with a team of designers to implement pixel-perfect designs",
            "Optimized application performance and improved load times by 40%",
          ]}
        />

        <CompanyCard
          companyImage="/favicon.ico?height=40&width=40"
          companyName="Digital Solutions"
          title="Web Developer"
          position="Part-time"
          date="Jun 2018 - Feb 2020"
          description={[
            "Created and maintained websites for small businesses",
            "Implemented SEO best practices and improved site performance",
            "Provided technical support and training to clients",
          ]}
        />
      </div>
    </div>
  )
}
