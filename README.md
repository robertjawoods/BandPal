# Bandpal

[![.github/workflows/test.yml](https://github.com/robertjawoods/BandPal/actions/workflows/test.yml/badge.svg)](https://github.com/robertjawoods/BandPal/actions/workflows/test.yml)
![Vercel](https://vercelbadge.vercel.app/api/robertjawoods/bandpal)

## Local Environment Setup

### Requirements

* Bun
* Docker Desktop

### Dev Instructions

1. Install Bun
2. Install Docker Desktop
3. Run `bun install` in the root directory to install dependencies
4. Run `bun supabase:start` and wait for the command to finish and display environment variable values.
5. Run `bun db:reset`
6. To enable chat functionality, visit the supabase studio URL, open the table editor, go to the public.Message table and enable realtime in the top right
