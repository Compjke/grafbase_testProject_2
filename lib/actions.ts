import { ProjectForm } from '@/common.types';
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from '@/graphql';
import {GraphQLClient} from 'graphql-request';


const isProduction = process.env.NODE_ENV === 'production'


const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql"

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "1234"; 

const serverUrl = isProduction 
? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000'

const client = new GraphQLClient(apiUrl)




export const fetchToken = async () => {
  try {
    const res = await fetch(`${serverUrl}/api/auth/token`);
    return res.json();
  } catch (err) {
    throw err;
  }
};


export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path : imagePath
      }),
    });

    return res.json();
  } catch (err) {
    throw err;
  }
};


const make_GQL_Request = async (
   query : string,
   variables = {}
   ) => {
 try {
   return await client.request(query,variables)
 } catch (err) {
   throw err;
 }
}

export const getUser = (email : string) => {
   client.setHeader('x-api-key', apiKey)
   return make_GQL_Request(getUserQuery, {
      email
   })
}

export const createUser = (
  name : string,
  email : string,
  avatarUrl : string
) => {
  client.setHeader("x-api-key", apiKey);
 const variables = {
  input : {
    name,
    email,
    avatarUrl
  }
 }
  return make_GQL_Request(createUserMutation, variables);
}




export const createProject = async (
  form : ProjectForm , 
  creatorId : string,
  token : string 
  ) => {
  
    const imageUrl = await uploadImage(form.image)
    if(imageUrl.url) {
      client.setHeader('Authorization' , `Bearer ${token}`)
      
      const variables = {
        input : {
          ...form,
          image : imageUrl.url,
          createdBy: {
            link : creatorId
          }
        }
      }
      return make_GQL_Request(createProjectMutation , variables)
    }
}
export const fetchAllProjects = (
  category?: string | null,
  endcursor?: string | null
) => {
  client.setHeader("x-api-key", apiKey);

  return make_GQL_Request(projectsQuery, { category, endcursor });
};

export const getProjectDetails = (id : string) => {
    client.setHeader("x-api-key", apiKey);
    return make_GQL_Request(getProjectByIdQuery, {
      id,
    });
}
export const getUserProjects = (id : string , last? : number) => {
    client.setHeader("x-api-key", apiKey);
    return make_GQL_Request(getProjectsOfUserQuery, {
      id , last
    });
}
export const deleteProject = async (id : string , token : number) => {
     client.setHeader("Authorization", `Bearer ${token}`);
    return make_GQL_Request(deleteProjectMutation, {
      id 
    });
}

export const updateProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm,
  };

  return make_GQL_Request(updateProjectMutation, variables);
};
