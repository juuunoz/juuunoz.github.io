module.exports = {
  apps: [
    {
      name: 'express',
      script: './server.js',
      instances: 1, // increase or set to 'max' for cluster mode later
      exec_mode: 'fork', // use 'cluster' if you scale instances
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      autorestart: true,
      max_memory_restart: '300M',
      watch: false, // don't watch files in prod
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      merge_logs: true,
      time: true,
    },
  ],
};