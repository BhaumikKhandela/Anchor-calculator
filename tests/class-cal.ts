import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ClassCal } from "../target/types/class_cal";
import { assert } from "chai";

describe("class-cal", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.classCal as Program<ClassCal>;
  const newAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .init(10)
      .accounts({
        account: newAccount.publicKey,
        signer: anchor.getProvider().publicKey,
      })
      .signers([newAccount])
      .rpc();

    console.log("Your transaction signature", tx);
  });
  it("Double the number", async () => {
    const tx = await program.methods
      .double()
      .accounts({
        account: newAccount.publicKey,
        signer: anchor.getProvider().publicKey,
      })
      .rpc();

    console.log("Your transaction signature", tx);

    const account = await program.account.dataShape.fetch(newAccount.publicKey);
    assert.equal(account.num, 20);
  });

  it("2 Added", async () => {
    const tx = await program.methods
      .add(2)
      .accounts({
        account: newAccount.publicKey,
        signer: anchor.getProvider().publicKey,
      })
      .rpc();

    console.log("Your transaction signature", tx);

    const account = await program.account.dataShape.fetch(newAccount.publicKey);

    assert.equal(account.num, 22);
  });

  it("Amount is doubled", async () => {
    // This should fail - someone else trying to modify
    const otherWallet = anchor.web3.Keypair.generate();

    await program.methods
      .double()
      .accounts({
        account: newAccount.publicKey,
        signer: otherWallet.publicKey,
      })
      .signers([otherWallet])
      .rpc();

    // If we get here, security is broken!

    const account = await program.account.dataShape.fetch(newAccount.publicKey);

    assert.equal(account.num, 44);
  });
});
