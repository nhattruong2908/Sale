<?php

namespace App\Models\Entities;

class Common
{
    private int $id;
    private \DateTime $create_date;
    private \DateTime $update_date;
    private bool $del_flag;

    public function __construct()
    {
        $this->create_date = new \DateTime();
        $this->update_date = new \DateTime();
        $this->del_flag = false;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getCreateDate(): \DateTime
    {
        return $this->create_date;
    }

    public function setCreateDate(\DateTime $create_date): self
    {
        $this->create_date = $create_date;
        return $this;
    }

    public function getUpdateDate(): \DateTime
    {
        return $this->update_date;
    }

    public function setUpdateDate(\DateTime $update_date): self
    {
        $this->update_date = $update_date;
        return $this;
    }

    public function getDelFlag(): bool
    {
        return $this->del_flag;
    }

    public function setDelFlag(bool $del_flag): self
    {
        $this->del_flag = $del_flag;
        return $this;
    }
}