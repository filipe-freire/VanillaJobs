## Models

### User

```
User {
companyName: {
type: String,
required: true,
minlength: 2,
maxlength: 200
},
email: {
type: String,
required: true,
minlength: 5,
},
passwordHashAndSalt: {
type: String,
required: true
},
jobPosts: (Array????)
}
}
```

### Job post

```
Post {
creator: {
type: mongoose.Schema.Types.ObjectId,
required: true,
ref: 'User'
},
title: {
type: String,
required: true,
},
location: {
type: String,
required: true,
},
description: {
type: String,
required: true
},
tasks: {
type: [],
min-length: 1,
required: true
},
requirements: {
type: [],
required: true
},
seniority: {
type: String,
required: true
},
tech: {
type: [],
required
}
}
```

### Job application

```
Application {
candidateName: {
type: String,
required: true,
min-length: 3
},
candidateEmail: {
type: String,
required: true,
min-length: 5
},
candidateLocation: {
type: String
},
resumeUpload: {
type: String
},
linkedinUrl: {
type: String
},
githubUrl: {
type: String
},
photo: {
type: String
}
}
```
