import { Express } from "express";

import { authRouter } from "@/modules/auth/auth.module";
import {
  userRouter,
  educationRouter,
  experienceRouter,
  publicationRouter,
  testScoreRouter,
  certificationRouter,
  awardRouter,
  refereeRouter,
} from "@/modules/users/user.module";
import { opportunityRouter } from "@/modules/opportunities/opportunity.module";
import { savedOpportunityRouter } from "@/modules/saved-opportunities/saved-opportunity.module";
import { documentRouter } from "@/modules/documents/document.module";
import { applicationRouter } from "@/modules/applications/application.module";
import { notificationRouter } from "@/modules/notifications/notification.module";
import { commentRouter } from "@/modules/comments/comment.module";
import { inquiryRouter } from "@/modules/inquiries/inquiry.module";

const V1 = '/api/v1'

export function registerRoutes(app: Express) {
  app.use(`${V1}/auth`, authRouter);
  app.use(`${V1}/users`, userRouter);
  app.use(`${V1}/users/me/educations`, educationRouter);
  app.use(`${V1}/users/me/experiences`, experienceRouter);
  app.use(`${V1}/users/me/publications`, publicationRouter);
  app.use(`${V1}/users/me/test-scores`, testScoreRouter);
  app.use(`${V1}/users/me/certifications`, certificationRouter);
  app.use(`${V1}/users/me/awards`, awardRouter);
  app.use(`${V1}/users/me/referees`, refereeRouter);
  app.use(`${V1}/opportunities`, opportunityRouter);
  app.use(`${V1}/opportunities/:opportunityId/comments`, commentRouter);
  app.use(`${V1}/saved-opportunities`, savedOpportunityRouter);
  app.use(`${V1}/documents`, documentRouter);
  app.use(`${V1}/applications`, applicationRouter);
  app.use(`${V1}/notifications`, notificationRouter);
  app.use(`${V1}/inquiries`, inquiryRouter);
}
