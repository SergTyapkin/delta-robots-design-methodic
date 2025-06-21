export default {
  // Other pages
  '/': false, // root is always false

  // User pages
  '/specialization': true,
  '/connections': true,
  '/kinematics': true,
  '/cross-sections': true,
  '/dynamics': true,
  '/trajectories': true,
  '/materials': true,
  '/drives': true,
  '/deformations': true,
  '/results': true,

  // Page 404
  '/:pathMatch(.*)*': false,
};
