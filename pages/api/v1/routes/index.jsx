import auth from 'api/v1/routes/auth';

const routes = {
  auth,
};

function withLogging(name, fn) {
  return async (db, dados, token) => {
    try {
      return await fn(db, dados, token);
    } catch (error) {
      console.error(`[${name}] status: erro -`, error);
      throw error;
    }
  };
}

for (const [name, fn] of Object.entries(routes)) {
  routes[name] = withLogging(name, fn);
}

export default routes;
