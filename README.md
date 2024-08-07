<p align="center">
  <img src="https://github.com/campfire-previews/campfire-app/blob/main/src/assets/campfire.svg" width="500" height="auto" />
</p>

<h1 align="center">Campfire: An open-source, self-hosted deploy preview tool with integrated feedback for containerized, headless frontends.</h1>

Campfire is an open-source, self-hosted deploy preview solution that spins up dedicated environments for each feature branch when a pull request is opened. Much like how an actual campfire brings people together to trade stories, Campfire aims to be a central place for cross-functional teams to visually review and discuss proposed code changes or bug fixes early in the software development cycle.

Campfire integrates a feedback interface directly into each deploy preview, allowing teams to collaborate efficiently on proposed code changes or bug fixes from the early stages of development. All user interactions are synced bidirectionally with the associated GitHub pull request. For more detailed insights, please refer to our [full case study](https://campfire-previews.github.io/).

## Features

- **Automated Deploy Previews** - For each pull request, Campfire automatically generates a deploy preview accessible via a public URL.
- **Integrated Feedback Interface** - Enables direct user feedback within the deploy preview, synchronized with GitHub pull requests issue comments for seamless collaboration.
- **Session Replay** - Captures user interactions within the deploy preview to aid in debugging and understanding user experiences.

## System Requirements

Campfire supports front-end applications that meet the following criteria:

- Hosted on GitHub.
- Include a Dockerfile.
- Operate independently of a backend or interact with an external backend via APIs.

## Architecture

Campfire leverages several technologies:

- **GitHub Actions** - Automates the deployment of deploy previews.
- **AWS ECS** - Hosts the deploy previews in a scalable, containerized environment.
- **AWS Lambda** - Manages backend functionalities including GitHub API interactions and AWS services, reducing server management overhead.
- **AWS S3** - Stores session replay data and other user-generated content, ensuring data is easily accessible and securely managed.

## Getting Started

To start using Campfire, follow the setup instructions in our [installation guide](https://github.com/campfire-previews/campfire-cli#readme). Campfire's CLI tool facilitates easy configuration and management of the deploy environment.

You can also view a 45 second demo of Campfire [here](https://campfire-previews.github.io/).

## Future Enhancements

- **CSS Editor** - Allow users to suggest and apply CSS changes directly within the deploy preview.
- **Screenshot Functionality** - Enable capturing specific moments within the deploy preview for easy sharing and documentation.
- **GitHub User Authorization** - Streamline user identification by linking comments directly to GitHub accounts.
- **Cost Optimization** - Investigate methods to merge the feedback interface with the client app to reduce operational costs.

## Campfire Team

[Allen Lee](https://a.llenlee.com/) • Software Engineer • Leonia, NJ

[Rachele Lang](https://ramlang.github.io/) • Software Engineer • Denver, CO

[Tess Lockey](https://tesslockey.com/) • Software Engineer • Las Vegas, NV

[Weston Ludeke](https://westonludeke.github.io) • Software Engineer • Houston, TX
