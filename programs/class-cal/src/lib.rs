use anchor_lang::prelude::*;

declare_id!("2pbtitpn77br1ptRZNYev2jonXQ9LQ5zovhQuK3oFA1Z");

#[program]
pub mod class_cal {
    use super::*;

    pub fn init(ctx: Context<Initialize>, init_value: u32) -> Result<()>{
        ctx.accounts.account.num = init_value;
        Ok(())
    }

    pub fn double(ctx: Context<Double>) -> Result<()>{
       ctx.accounts.account.num = ctx.accounts.account.num * 2;
       Ok(())
    }

    pub fn add(ctx: Context<Add>, num: u32) -> Result<()>{
        ctx.accounts.account.num = ctx.accounts.account.num + num;
        Ok(())
    }

   
}

#[account]
pub struct DataShape {
    pub num: u32
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 4)]
    pub account: Account<'info, DataShape>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Double<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub account: Account<'info, DataShape>
}

#[derive(Accounts)] 
pub struct Add<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub account: Account<'info, DataShape>
}
 