import { MetamaskIcon } from "../../icons/MetamaskIcon";
import { GetStartedScreen } from "../GetStartedScreen";

export const MetamaskGetStarted: React.FC<{ onBack: () => void }> = (props) => {
  return (
    <GetStartedScreen
      WalletIcon={MetamaskIcon}
      walletName="Metamask"
      chromeExtensionLink="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
      googlePlayStoreLink="https://play.google.com/store/apps/details?id=io.metamask"
      appleStoreLink="https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202"
      onBack={props.onBack}
    />
  );
};