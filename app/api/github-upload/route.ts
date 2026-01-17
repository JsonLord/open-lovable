import { NextRequest, NextResponse } from 'next/server';
import simpleGit from 'simple-git';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const { repo, branch } = await req.json();
  const githubToken = process.env.GITHUB_TOKEN;
  const blabladorApiKey = process.env.BLABLADOR_API_KEY;

  if (!githubToken) {
    console.log('GITHUB_TOKEN environment variable is not set. Please set it in the container logs.');
    return NextResponse.json({ error: 'GitHub token is not configured. Please set the GITHUB_TOKEN environment variable.' }, { status: 500 });
  }

  if (!blabladorApiKey) {
    console.log('BLABLADOR_API_KEY environment variable is not set. Please set it in the container logs.');
  }

  if (!repo || !branch) {
    return NextResponse.json({ error: 'Repository and branch are required.' }, { status: 400 });
  }

  const repoUrl = `https://${githubToken}@github.com/${repo}.git`;
  const tmpDir = '/tmp/github-upload';

  try {
    await fs.rm(tmpDir, { recursive: true, force: true });
    await fs.mkdir(tmpDir, { recursive: true });

    const git = simpleGit(tmpDir);
    await git.init();
    await fs.cp(process.cwd(), tmpDir, { recursive: true });
    await git.add('.');
    await git.commit('Initial commit');
    await git.addRemote('origin', repoUrl);
    await git.push('origin', `HEAD:refs/heads/${branch}`, ['--force']);

    return NextResponse.json({ message: 'Successfully uploaded to GitHub.' });
  } catch (error: any) {
    console.error('GitHub upload failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
