import { UserProfile } from "@/modules/users/domain/user";
import { Education } from "@/modules/users/domain/education";
import { Experience } from "@/modules/users/domain/experience";
import { Publication } from "@/modules/users/domain/publication";
import { TestScore } from "@/modules/users/domain/test-score";
import { Certification } from "@/modules/users/domain/certification";
import { Award } from "@/modules/users/domain/award";
import { Referee } from "@/modules/users/domain/referee";
import { Opportunity } from "@/modules/opportunities/domain/opportunity";
import { DocumentType } from "../domain/document";

export interface EnrichedProfile {
  profile: UserProfile;
  educations: Education[];
  experiences: Experience[];
  publications: Publication[];
  testScores: TestScore[];
  certifications: Certification[];
  awards: Award[];
  referees: Referee[];
}

function formatEnrichedProfile(enriched: EnrichedProfile): string {
  const parts: string[] = [];
  const { profile, educations, experiences, publications, testScores, certifications, awards, referees } = enriched;

  // Basic info
  if (profile.firstName || profile.lastName) {
    parts.push(`Name: ${profile.firstName} ${profile.lastName}`.trim());
  }
  if (profile.countryOfOrigin) parts.push(`Country: ${profile.countryOfOrigin}`);
  if (profile.researchInterests?.length) parts.push(`Research Interests: ${profile.researchInterests.join(", ")}`);
  if (profile.bio) parts.push(`Bio: ${profile.bio}`);

  // Education
  if (educations.length) {
    parts.push("\n### Education");
    for (const edu of educations) {
      const line = [`- ${edu.degree} in ${edu.fieldOfStudy} at ${edu.institution}`];
      if (edu.country) line.push(`(${edu.country})`);
      if (edu.gpa) line.push(`GPA: ${edu.gpa}${edu.gpaScale ? `/${edu.gpaScale}` : ""}`);
      if (edu.startDate || edu.endDate) {
        const start = edu.startDate ? new Date(edu.startDate).getFullYear() : "?";
        const end = edu.endDate ? new Date(edu.endDate).getFullYear() : "Present";
        line.push(`(${start} - ${end})`);
      }
      parts.push(line.join(" "));
      if (edu.thesis) parts.push(`  Thesis: ${edu.thesis}`);
      if (edu.description) parts.push(`  ${edu.description}`);
    }
  }

  // Experience
  if (experiences.length) {
    parts.push("\n### Experience");
    for (const exp of experiences) {
      const line = [`- ${exp.title} at ${exp.organization} [${exp.type}]`];
      if (exp.location) line.push(`(${exp.location})`);
      if (exp.startDate || exp.endDate) {
        const start = exp.startDate ? new Date(exp.startDate).getFullYear() : "?";
        const end = exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : "?";
        line.push(`(${start} - ${end})`);
      }
      parts.push(line.join(" "));
      if (exp.description) parts.push(`  ${exp.description}`);
    }
  }

  // Publications
  if (publications.length) {
    parts.push("\n### Publications");
    for (const pub of publications) {
      const line = [`- ${pub.title}`];
      if (pub.journal) line.push(`in ${pub.journal}`);
      if (pub.type) line.push(`[${pub.type}]`);
      if (pub.date) line.push(`(${new Date(pub.date).getFullYear()})`);
      if (pub.authors?.length) line.push(`Authors: ${pub.authors.join(", ")}`);
      parts.push(line.join(" "));
    }
  }

  // Test Scores
  if (testScores.length) {
    parts.push("\n### Test Scores");
    for (const ts of testScores) {
      const line = [`- ${ts.testName}: ${ts.score}`];
      if (ts.subScores && Object.keys(ts.subScores).length) {
        const subs = Object.entries(ts.subScores).map(([k, v]) => `${k}: ${v}`).join(", ");
        line.push(`(${subs})`);
      }
      parts.push(line.join(" "));
    }
  }

  // Certifications
  if (certifications.length) {
    parts.push("\n### Certifications");
    for (const cert of certifications) {
      const line = [`- ${cert.name}`];
      if (cert.issuingOrg) line.push(`by ${cert.issuingOrg}`);
      if (cert.dateIssued) line.push(`(${new Date(cert.dateIssued).getFullYear()})`);
      parts.push(line.join(" "));
    }
  }

  // Awards
  if (awards.length) {
    parts.push("\n### Awards & Honours");
    for (const award of awards) {
      const line = [`- ${award.title}`];
      if (award.issuingOrg) line.push(`by ${award.issuingOrg}`);
      if (award.date) line.push(`(${new Date(award.date).getFullYear()})`);
      parts.push(line.join(" "));
      if (award.description) parts.push(`  ${award.description}`);
    }
  }

  // Referees
  if (referees.length) {
    parts.push("\n### Referees");
    for (const ref of referees) {
      const line = [`- ${ref.name}`];
      if (ref.title) line.push(`(${ref.title})`);
      if (ref.institution) line.push(`at ${ref.institution}`);
      if (ref.email) line.push(`Email: ${ref.email}`);
      if (ref.relationship) line.push(`Relationship: ${ref.relationship}`);
      parts.push(line.join(" "));
    }
  }

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
  enrichedProfile: EnrichedProfile,
  userInstructions?: string,
  opportunity?: Opportunity,
): { system: string; user: string } {
  const profileText = formatEnrichedProfile(enrichedProfile);
  const oppText = opportunity ? formatOpportunity(opportunity) : "";

  const systemPrompts: Record<DocumentType, string> = {
    [DocumentType.CV]: `You are an expert academic CV writer. Generate a professional, well-structured academic CV/resume based on the student's profile. Use clear sections (Education, Research Experience, Publications, Skills, etc.). Format the output in clean Markdown. Be accurate - only use information provided, do not fabricate details. Use this template but dont just return empty sections, only include sections that have content. Use the following placeholders for missing information and this template is just a guidde, you can change the order of sections and add/remove sections as needed. The CV should be concise, ideally 1-2 pages, and highlight the student's academic achievements, research experience, publications, and relevant skills. Use bullet points for clarity and avoid long paragraphs. Ensure that the CV is tailored to the target opportunity if provided. It should also be formatted in an appealing cv manner, and not just an up down list like this template:
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

    [DocumentType.SOP]: `You are an expert academic writing consultant specializing in Statements of Purpose for graduate school applications. Write a compelling, authentic, and well-structured SOP that connects the student's background, research interests, and career goals to the target program. Be genuine and specific - avoid generic platitudes. Format in clean Markdown paragraphs. But no need for topics/headings in between, just an essay that flows naturally and a heading at the top that says "Statement of Purpose". The SOP should be concise, ideally 1-2 pages, and highlight the student's academic achievements, research experience, publications, and relevant skills. Ensure that the SOP is tailored to the target opportunity if provided`,

    [DocumentType.RESEARCH_PROPOSAL]: `You are an expert academic research proposal writer. Generate a structured research proposal based on the student's research interests and academic background. Include sections: Title, Abstract, Introduction/Background, Research Questions, Methodology, Expected Outcomes, Timeline, and References (suggest relevant areas). Format in clean Markdown. But no need for topics/headings in between, just an essay that flows naturally and a heading at the top with a title you form or just "Research Proposal". The proposal should be concise, ideally 1-3 pages, and highlight the student's academic achievements, research experience, publications, and relevant skills. Ensure that the proposal is tailored to the target opportunity if provided. Be specific and avoid generic statements. Do not fabricate details - only use information provided.`,

    [DocumentType.COLD_EMAIL]: `You are an expert at writing professional cold emails to potential academic supervisors. Write a concise, professional cold email (200-300 words) that introduces the student, highlights their relevant research experience and publications, expresses genuine interest in the supervisor's research based on the opportunity details, and requests a meeting or further discussion. The tone should be respectful, specific, and not overly formal. Do not fabricate details - only use information provided.`,

    [DocumentType.FEE_WAIVER]: `You are an expert at writing fee waiver request letters for graduate school applications. Write a compelling fee waiver request (~400 words) that balances the student's financial situation with their strong academic merit. The letter should respectfully explain the financial need, highlight academic achievements, test scores, publications, and awards that demonstrate the student is a strong candidate worthy of consideration. Maintain a professional and dignified tone throughout. Format in clean Markdown. No need for topics/headings in between, just a heading at the top that says "Application Fee Waiver Request"`,

    [DocumentType.PERSONAL_STATEMENT]: `You are an expert academic writing consultant specializing in Personal Statements for graduate school applications. Write a deeply personal, reflective narrative that is distinct from a Statement of Purpose. This should tell the student's broader life story - their motivations, challenges overcome, formative experiences, and personal growth that led them to pursue graduate studies. Avoid section headers. Write in a natural, flowing essay style that reveals character and authentic voice. Format in clean Markdown paragraphs. No need for topics/headings in between, just a heading at the top that says "Personal Statement".`,
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
