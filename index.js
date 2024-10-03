import { exec } from 'child_process';
import express from 'express';

const app = express();
app.use(express.json());

// REST API to execute a command inside the same pod
app.post('/exec', (req, res) => {
  const { cmd } = req.body;

  if (!cmd) {
    return res.status(400).json({ error: 'Command (cmd) is required.' });
  }

  // Execute the command
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }

    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    // Return the command output
    res.json({ output: stdout });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
