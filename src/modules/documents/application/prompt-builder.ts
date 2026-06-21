import { UserProfile } from "@/modules/users/domain/user";
import { Opportunity } from "@/modules/opportunities/domain/opportunity";
import { DocumentType } from "../domain/document";

function formatProfile(profile: UserProfile): string {
  const parts: string[] = [];

  if (profile.firstName || profile.lastName) {
    parts.push(`Name: ${profile.firstName} ${profile.lastName}`.trim());
  }
  if (profile.university) parts.push(`University: ${profile.university}`);
  if (profile.degree) parts.push(`Degree: ${profile.degree}`);
  if (profile.fieldOfStudy) parts.push(`Field of Study: ${profile.fieldOfStudy}`);
  if (profile.gpa) parts.push(`GPA: ${profile.gpa}`);
  if (profile.graduationYear) parts.push(`Graduation Year: ${profile.graduationYear}`);
  if (profile.countryOfOrigin) parts.push(`Country: ${profile.countryOfOrigin}`);
  if (profile.researchInterests?.length) parts.push(`Research Interests: ${profile.researchInterests.join(", ")}`);
  if (profile.publications?.length) parts.push(`Publications: ${profile.publications.join("; ")}`);
  if (profile.workExperience) parts.push(`Work Experience: ${profile.workExperience}`);
  if (profile.skills?.length) parts.push(`Skills: ${profile.skills.join(", ")}`);
  if (profile.bio) parts.push(`Bio: ${profile.bio}`);

  return parts.join("\n");
}

function formatOpportunity(opp: Opportunity): string {
  return [
    `Program: ${opp.title}`,
    `University: ${opp.university}`,
    `Country: ${opp.country}`,
    `Degree Level: ${opp.degreeLevel}`,
    `Type: ${opp.opportunityType}`,
    `Funding: ${opp.fundingType}`,
    opp.fieldsOfStudy.length ? `Fields: ${opp.fieldsOfStudy.join(", ")}` : "",
    `Description: ${opp.description}`,
  ].filter(Boolean).join("\n");
}

export function buildPrompt(
  type: DocumentType,
  userProfile: UserProfile,
  userInstructions?: string,
  opportunity?: Opportunity,
): { system: string; user: string } {
  const profileText = formatProfile(userProfile);
  const oppText = opportunity ? formatOpportunity(opportunity) : "";

  const systemPrompts: Record<DocumentType, string> = {
    [DocumentType.CV]: `You are an expert academic CV writer. Generate a professional, well-structured academic CV/resume based on the student's profile. Use clear sections (Education, Research Experience, Publications, Skills, etc.). Format the output in clean Markdown. Be accurate - only use information provided, do not fabricate details. Use this template: 
      PERSONAL INFORMATION
      Full Name: {{FULL_NAME}}
      Professional Title: {{PROFESSIONAL_TITLE}}
      Email: {{EMAIL}}
      Phone: {{PHONE}}
      LinkedIn: {{LINKEDIN}}
      Address: {{ADDRESS}}
      EDUCATION
      Degree: {{DEGREE}}
      Institution: {{INSTITUTION}}
      Graduation Date: {{GRAD_DATE}}
      CGPA/GPA: {{GPA}}
      Class of Degree: {{CLASS}}
      Thesis Title: {{THESIS_TITLE}}
      Supervisor: {{SUPERVISOR}}
      RESEARCH INTERESTS
      {{RESEARCH_INTERESTS}}
      RESEARCH EXPERIENCE
      Position: {{RESEARCH_POSITION}}
      Institution: {{RESEARCH_INSTITUTION}}
      Duration: {{RESEARCH_DURATION}}
      Project Title: {{PROJECT_TITLE}}
      Aim: {{PROJECT_AIM}}
      Methodology: {{METHODOLOGY}}
      Research Outcome: {{OUTCOME}}
      Skills Acquired: {{RESEARCH_SKILLS}}
      Supervisor: {{RESEARCH_SUPERVISOR}}
      TEACHING EXPERIENCE
      {{TEACHING_EXPERIENCE}}
      PROFESSIONAL EXPERIENCE
      {{PROFESSIONAL_EXPERIENCE}}
      PUBLICATIONS
      {{PUBLICATIONS}}
      WORKSHOPS / CONFERENCES / WEBINARS
      {{EVENTS}}
      PROFESSIONAL MEMBERSHIPS
      {{MEMBERSHIPS}}
      HONOURS & AWARDS
      {{AWARDS}}
      CORE SKILLS
      {{CORE_SKILLS}}
      DIGITAL SKILLS
      {{DIGITAL_SKILLS}}
      COMMUNITY SERVICE & VOLUNTEERING
      {{VOLUNTEERING}}
      REFEREES
      {{REFEREE_1}}
      {{REFEREE_2}}
      {{REFEREE_3}}
      `,

    [DocumentType.SOP]: `You are an expert academic writing consultant specializing in Statements of Purpose for graduate school applications. Write a compelling, authentic, and well-structured SOP that connects the student's background, research interests, and career goals to the target program. Be genuine and specific - avoid generic platitudes. Format in clean Markdown paragraphs. But no need for topics/headings in between, just an essay that flows naturally`,

    [DocumentType.RESEARCH_PROPOSAL]: `You are an expert academic research proposal writer. Generate a structured research proposal based on the student's research interests and academic background. Include sections: Title, Abstract, Introduction/Background, Research Questions, Methodology, Expected Outcomes, Timeline, and References (suggest relevant areas). Format in clean Markdown. But no need for topics/headings in between, just an essay that flows naturally`,
  };

  let userPrompt = `## Student Profile\n${profileText}\n\n`;

  if (oppText) {
    userPrompt += `## Target Opportunity\n${oppText}\n\n`;
  }

  if (userInstructions) {
    userPrompt += `## Instructions\n${userInstructions}`;
  }

  return {
    system: systemPrompts[type],
    user: userPrompt,
  };
}
