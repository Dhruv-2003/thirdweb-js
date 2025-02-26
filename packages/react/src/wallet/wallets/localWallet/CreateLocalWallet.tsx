import { Spacer } from "../../../components/Spacer";
import { Button } from "../../../components/buttons";
import { FormFieldWithIconButton } from "../../../components/formFields";
import { ModalDescription } from "../../../components/modalElements";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  PinBottomIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useWalletContext } from "@thirdweb-dev/react-core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalWalletInfo } from "./useLocalWalletInfo";
import { ImportLocalWallet } from "./ImportLocalWallet";
import { Container, ModalHeader } from "../../../components/basic";
import { TextDivider } from "../../../components/TextDivider";
import { Spinner } from "../../../components/Spinner";
import { iconSize, spacing } from "../../../design-system";
import type { LocalWalletConfig } from "./types";

export const CreateLocalWallet_Password: React.FC<{
  onConnect: () => void;
  goBack: () => void;
  localWalletConf: LocalWalletConfig;
  renderBackButton: boolean;
  persist: boolean;
}> = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordMismatch = confirmPassword && password !== confirmPassword;
  const [isConnecting, setIsConnecting] = useState(false);

  const { localWallet } = useLocalWalletInfo(
    props.localWalletConf,
    props.persist,
  );

  const { setConnectedWallet, setConnectionStatus } = useWalletContext();
  const [showImportScreen, setShowImportScreen] = useState(false);

  const [generatedAddress, setGeneratedAddress] = useState<string | null>(null);

  // generating wallet before it's required to render a form with hidden address as username for better autofill
  useEffect(() => {
    if (!localWallet || showImportScreen || localWallet.ethersWallet) {
      return;
    }

    localWallet.generate().then((_address) => {
      setGeneratedAddress(_address);
    });
  }, [localWallet, showImportScreen]);

  if (showImportScreen) {
    return (
      <ImportLocalWallet
        localWalletConf={props.localWalletConf}
        onConnect={props.onConnect}
        goBack={() => {
          setShowImportScreen(false);
        }}
        persist={props.persist}
      />
    );
  }

  const handleConnect = async () => {
    if (passwordMismatch || !localWallet) {
      throw new Error("Invalid state");
    }

    setIsConnecting(true);
    setConnectionStatus("connecting");
    await localWallet.connect();

    await localWallet.save({
      strategy: "encryptedJson",
      password,
    });

    setConnectedWallet(localWallet);
    setIsConnecting(false);
    props.onConnect();
  };

  return (
    <Container p="lg" fullHeight>
      <ModalHeader
        onBack={props.renderBackButton ? props.goBack : undefined}
        title={props.localWalletConf.meta.name}
        imgSrc={props.localWalletConf.meta.iconURL}
      />

      <Spacer y="lg" />

      <ModalDescription sm>
        Choose a password for your wallet You{`'`}ll be able to access and
        export this wallet with the same password.
      </ModalDescription>

      <Spacer y="lg" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConnect();
        }}
      >
        {/* Hidden Account Address as Username */}
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={generatedAddress || ""}
          disabled
          style={{ display: "none" }}
        />

        {/* Password */}
        <FormFieldWithIconButton
          name="password"
          required
          autocomplete="new-password"
          id="new-password"
          onChange={(value) => setPassword(value)}
          right={{
            icon: showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />,
            onClick: () => setShowPassword(!showPassword),
          }}
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          dataTest="new-password"
        />

        <Spacer y="lg" />

        {/* Confirm Password */}
        <FormFieldWithIconButton
          name="confirm-password"
          required
          autocomplete="new-password"
          id="confirm-password"
          onChange={(value) => setConfirmPassword(value)}
          right={{
            icon: showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />,
            onClick: () => setShowPassword(!showPassword),
          }}
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          error={passwordMismatch ? "Passwords don't match" : ""}
          dataTest="confirm-password"
        />

        <Spacer y="lg" />

        {/* Create */}
        <Button
          variant="accent"
          type="submit"
          fullWidth
          style={{
            gap: spacing.xs,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          data-test="create-new-wallet-button"
        >
          {!isConnecting && (
            <PlusIcon width={iconSize.sm} height={iconSize.sm} />
          )}
          {isConnecting ? "Connecting" : "Create new wallet"}
          {isConnecting && <Spinner size="sm" color="accentButtonText" />}
        </Button>
      </form>

      <Spacer y="xl" />

      <TextDivider>
        <span>OR</span>
      </TextDivider>

      <Spacer y="xl" />

      {/* Import */}
      <Button
        fullWidth
        variant="outline"
        onClick={() => {
          setShowImportScreen(true);
        }}
        style={{
          display: "flex",
          gap: spacing.sm,
          alignItems: "center",
        }}
      >
        <PinBottomIcon width={iconSize.sm} height={iconSize.sm} />
        Import wallet
      </Button>
    </Container>
  );
};

export const CreateLocalWallet_Guest: React.FC<{
  onConnect: () => void;
  goBack: () => void;
  localWallet: LocalWalletConfig;
  persist: boolean;
}> = (props) => {
  const { localWallet } = useLocalWalletInfo(props.localWallet, props.persist);
  const { setConnectedWallet, setConnectionStatus } = useWalletContext();
  const { onConnect } = props;

  const handleConnect = useCallback(async () => {
    if (!localWallet) {
      throw new Error("Invalid state");
    }
    await localWallet.generate();
    setConnectionStatus("connecting");
    await localWallet.connect();
    setConnectedWallet(localWallet);
    onConnect();
  }, [localWallet, setConnectedWallet, onConnect, setConnectionStatus]);

  const connecting = useRef(false);
  useEffect(() => {
    if (connecting.current || !localWallet) {
      return;
    }
    connecting.current = true;
    handleConnect();
  }, [handleConnect, localWallet]);

  return (
    <Container
      flex="row"
      center="both"
      style={{
        height: "300px",
      }}
    >
      <Spinner size="lg" color="accentText" />
    </Container>
  );
};
