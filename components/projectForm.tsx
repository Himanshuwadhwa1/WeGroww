"use client"
import { useState ,useActionState} from 'react';
import * as React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { schemaValidation } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createProject } from '@/lib/action';

export interface IProjectFormProps {
}

export default function ProjectForm (props: IProjectFormProps) {
  const [errors,setErrors] = useState<Record<string,string>>({});
  const [pitch, setPitch] = useState("**I am empty, `Fill me Up!!!`**");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmitForm =async(prevState:any,formData : FormData)=>{
    try {
      const formValues = {
        title : formData.get("title") as string,
        description : formData.get("description") as string,
        category : formData.get("category") as string,
        link : formData.get("link") as string,
        pitch,
      }
      await schemaValidation.parseAsync(formValues);
      const result = await createProject(prevState,formData,pitch);
      console.log(result);
      if(result.status == "SUCCESS"){
        toast({
          title:'Sucess',
          description:'Your Project has been created successfully',
          variant:'default',
          className:'bg-secondary text-black'
        });
      }
      router.push(`project/${result._id}`);
      return result;
      
    } catch (error) {
      console.log(error);
      if(error instanceof z.ZodError){
        const fieldErorrs = error.flatten().fieldErrors;
        setErrors(fieldErorrs as unknown as Record<string,string>);
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant:"destructive",
          className:"bg-primary text-white rounded-lg"
        });
        return {...prevState,error:"Validation Failed",status:"ERROR"}
      }
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
        className:"bg-primary text-white rounded-lg"
      });
      return {...prevState,
        error:"Unexpected error has occured",
        status:"ERROR",
      }
    }finally{

    }
  }
  const [state,formAction,isPending] = useActionState(handleSubmitForm,{
    error : "",
    status : "INITIAL"
  })

  
  return (
    <form action={formAction} className='project-form'>
        <div>
          <label htmlFor="title" className='project-form_label'>Title</label>
          <Input id='title' name='title' className='project-form_input' required placeholder='Project Title' />
          {errors.title && <p className='project-form_error'>{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className='project-form_label'>Description</label>
          <Textarea id='description' name='description' className='project-form_textarea' required placeholder='Project Description' />
          {errors.description && <p className='project-form_error'>{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className='project-form_label'>Category</label>
          <Input id='category' name='category' className='project-form_input' required placeholder='Project Category (AI, Software, Security)' />
          {errors.category && <p className='project-form_error'>{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="link" className='project-form_label'>Image Link</label>
          <Input id='link' name='link' className='project-form_input' required placeholder='Project Image URL' />
          {errors.link && <p className='project-form_error'>{errors.link}</p>}
        </div>

        <div data-color-mode="light">
          <label htmlFor="pitch" className='project-form_label'>Readme / Pitch</label>
          <MDEditor value={pitch} onChange={(value) =>setPitch(value as string)}
            id='pitch' preview='live' height={300}
            style={{borderRadius:25,overflow:'hidden'}}
            textareaProps={{
              placeholder:'Breifly describe your Project \nwith Live working URL and github URL',
            }}
            previewOptions={{
              rehypePlugins : [[rehypeSanitize]],
              disallowedElements :["style"]
            }}
            />
          {errors.pitch && <p className='project-form_error'>{errors.pitch}</p>}
        </div>
        <Button type='submit' className='project-form_btn text-white' disabled={isPending}>
          {!isPending? 'Submit' : 'Submitting...'}
          <Send className='size-6 ml-2'/> 
        </Button>
    </form>
  );
}
