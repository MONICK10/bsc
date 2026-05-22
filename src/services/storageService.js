// Supabase Storage service for managing match images
import { supabase } from './supabaseClient.js';

const STORAGE_BUCKET = 'upcoming-matches';

// Upload image to Supabase Storage
export const uploadMatchImage = async (file, teamIdentifier) => {
  try {
    if (!file) return null;

    // Check if Supabase is configured
    if (!supabase.storage) {
      throw new Error('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
    }

    // Generate unique filename with timestamp
    const fileExtension = file.name.split('.').pop();
    const timestamp = Date.now();
    const filename = `${timestamp}-${teamIdentifier}.${fileExtension}`;
    const filepath = `${STORAGE_BUCKET}/${filename}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filename);

    return {
      url: publicUrl,
      path: filepath,
      filename: filename,
    };
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

// Delete image from Supabase Storage
export const deleteMatchImage = async (filename) => {
  try {
    if (!filename) return;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filename]);

    if (error) throw error;
  } catch (error) {
    console.error('Image delete error:', error);
    throw error;
  }
};

// Delete multiple images
export const deleteMatchImages = async (filenames) => {
  try {
    if (!filenames || filenames.length === 0) return;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove(filenames);

    if (error) throw error;
  } catch (error) {
    console.error('Multiple image delete error:', error);
    throw error;
  }
};
