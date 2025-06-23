export default {
  // Other pages
  '/': false, // root is always false

  // User pages
  '/modification': true,
  '/specialization': true,
  '/connections': true,
  '/kinematics': true,
  '/trajectories': true,
  '/cross-sections': true,
  '/materials': true,
  '/drives': true,
  '/deformations': true,
  '/results': true,

  // Page 404
  '/:pathMatch(.*)*': false,
};
