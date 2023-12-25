import { useTranslation } from 'react-i18next';

import { BasicPage, FormRow, NotUsingAlert } from './common';
import { TextInput } from "@/components/textInput";
import { config, updateConfig } from "@/utils/config";

export function PiperTtsSettingsPage({
  piperTtsUrl,
  setPiperTtsUrl,
  setSettingsUpdated,
}: {
  piperTtsUrl: string;
  setPiperTtsUrl: (key: string) => void;
  setSettingsUpdated: (updated: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <BasicPage
      title={t("Piper TTS") + " "+ t("Settings")}
      description={t("pipertts_desc", "Configure Piper-tts")}
    >
      { config("tts_backend") !== "pipertts" && (
        <NotUsingAlert>
          {t("not_using_alert", "You are not currently using {{name}} as your {{what}} backend. These settings will not be used.", {name: t("Piper.tts"), what: t("TTS")})}
        </NotUsingAlert>
      ) }
      <ul role="list" className="divide-y divide-gray-100 max-w-xs">
        <li className="py-4">
          <FormRow label={t("URL")}>
            <TextInput
              value={piperTtsUrl}
              onChange={(event: React.ChangeEvent<any>) => {
                setPiperTtsUrl(event.target.value);
                updateConfig("piper_tts_url", event.target.value);
                setSettingsUpdated(true);
              }}
            />
          </FormRow>
        </li>
      </ul>
    </BasicPage>
  );
}
