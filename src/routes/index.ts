import { Router } from "express";

import { EventRoutes } from "../modules/event/events.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/events",
    route: EventRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
