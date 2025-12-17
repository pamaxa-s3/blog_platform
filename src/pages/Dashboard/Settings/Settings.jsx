import { useState } from 'react';
import cls from './Settings.module.css';

const Settings = () => {
  // mock поточного користувача
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: '',
    avatar: '',
    twitter: '',
    github: '',
    linkedin: '',
  });

  const [isDirty, setIsDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    setSaved(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert('Імʼя та Email обовʼязкові');
      return;
    }

    // тут пізніше буде API
    console.log('save profile', form);

    setIsDirty(false);
    setSaved(true);
  };

  return (
    <div className={cls.wrapper}>
      <h1>Налаштування профілю</h1>

      <form className={cls.form} onSubmit={handleSubmit}>
        <div className={cls.section}>
          <h2>Основна інформація</h2>

          <label>
            Імʼя *
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Email *
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Біографія
            <textarea
              name="bio"
              rows="4"
              value={form.bio}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={cls.section}>
          <h2>Аватар</h2>

          <label>
            URL аватара
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
            />
          </label>

          {form.avatar && (
            <img
              src={form.avatar}
              alt="Avatar preview"
              className={cls.avatar}
            />
          )}
        </div>

        <div className={cls.section}>
          <h2>Соціальні мережі</h2>

          <label>
            Twitter
            <input
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
            />
          </label>

          <label>
            GitHub
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
            />
          </label>

          <label>
            LinkedIn
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={cls.actions}>
          <button type="submit">Зберегти зміни</button>
          {saved && <span className={cls.saved}>Збережено</span>}
          {isDirty && <span className={cls.unsaved}>Є незбережені зміни</span>}
        </div>
      </form>
    </div>
  );
};

export default Settings;