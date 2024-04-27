import { getImageUrl, uploadImage } from "@/services/images";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export function DocumentInput({ bucket, value, onChange }) {
  const supabase = useSupabaseClient();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (value) {
      getImageUrl(supabase, bucket, value).then(setImageUrl);
    }
  }, [value]);

  const handleClear = () => {
    onChange(null);
  };

  const handleSelectedImage = (event) => {
    uploadImage(supabase, bucket, event.target.files[0]).then(onChange);
  };

  if (value) {
    return (
      <div>
        {imageUrl && <a href={imageUrl}>Document</a>}
        <button onClick={handleClear}>Clear</button>
      </div>
    );
  }

  return <input type="file" onChange={handleSelectedImage} />;
}
