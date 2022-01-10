import { useState } from "react";

type commentFormProps = {
 submitLabel: string
 initialText?: string
 handleCancel?: () => void
 hasCancelButton?: boolean
 handleSubmit: (text: string, parentId: string) => void
}

const CommentForm = ({
 handleSubmit,
 submitLabel,
 handleCancel,
 initialText = "",
 hasCancelButton = false,
}: commentFormProps) => {

 const [text, setText] = useState(initialText);
 const isTextareaDisabled = text.length === 0;

 const onSubmit = (event: any) => {
  event.preventDefault();
  handleSubmit(text, '');
  setText("");
 };

 return (
  <form onSubmit={onSubmit}>
   <textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
   />
   <button
    disabled={isTextareaDisabled}
   >
    {submitLabel}
   </button>
   {hasCancelButton && (
    <button
     type="button"
     onClick={handleCancel}
    >
     Cancel
    </button>
   )}
  </form>
 );
};

export default CommentForm;